class Api::NotesController < ApplicationController
  before_action :set_note, only: [:show, :update, :destroy]
  before_action :simulate_latency, except: [:index, :destroy]

  def index
    @notes = current_user.notes.order("updated_at DESC").includes(:tags)
    render :index
  end

  def show
    if @note.user_id == current_user.id
      render :show
    else
      render json: 403, status: :forbidden
    end
  end

  def create
    @note = Note.new(note_params)
    @note.user_id = current_user.id
    @note.tag_ids = resolve_tags(params[:note][:tags])
    @note.search_hash = @note.searchable.hash
    if @note.save
      render :show
    else
      render json: 422, status: :unprocessable_entity
    end
  end

  def update
    reindex_if_changed
    check_for_removed_images
    if @note.update(note_params.except(:tags))
      render :show
    else
      render json: 422, status: :unprocessable_entity
    end
  end

  def destroy
    @note.destroy
    render :show
  end

  private
  def simulate_latency
    # sleep(2)
  end

  def note_params
    params.require(:note).permit(:title, :body, :user_id, :notebook_id, :is_archived, :tags)
  end

  def set_note
    @note = Note.find(params[:id])
  end
  def reindex_if_changed
    comparator = Note.new(note_params.except(:tags))
    if params[:note][:tags]
      comparator.tag_ids = resolve_tags(params[:note][:tags])
    end
    comparator.title ||= @note.title
    comparator.body ||= @note.body
    comparator.user_id ||= @note.user_id
    comparator.notebook_id ||= @note.notebook_id
    comparator.tag_ids ||= @note.tag_ids
    if !(@note.body =~ /data:[\s\S]+;base64/) && @note.search_hash != comparator.searchable.hash.to_s
      params[:note][:tags] ||= []
      @note.update_fuzzy_searchable!
      @note.search_hash = comparator.searchable.hash.to_s
    end
  end
  def check_for_removed_images
    stored_image_ids = @note.image_uploads.map { |upload| upload.id  }
    matcher = Regexp.new(/api\/image_uploads\/(\d+)/, "g")
    new_image_ids = note_params[:body].scan(matcher).flatten.map {|id| id.to_i }
    removed_image_ids = stored_image_ids - new_image_ids
    removed_image_ids.each do |id|
      # image = ImageUpload.where("updated_at < :minute AND id = :id", {:minute => 1.hour.ago, :id => id}).first
      image = ImageUpload.find(id)
      image.destroy if image
    end
  end
end
