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
    comparator = Note.new(note_params.except(:tags))
    comparator.tag_ids = @note.tag_ids
    comparator.title ||= @note.title
    comparator.body ||= @note.body
    comparator.user_id ||= @note.user_id
    comparator.notebook_id ||= @note.notebook_id
    @note.tag_ids = resolve_tags(params[:note][:tags])
    if @note.search_hash != comparator.searchable.hash.to_s
      params[:note][:tags] ||= []
      @note.update_fuzzy_searchable!
      @note.search_hash = comparator.searchable.hash.to_s
    end
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
  end

  def note_params
    params.require(:note).permit(:title, :body, :user_id, :notebook_id, :is_archived, :tags)
  end

  def set_note
    @note = Note.find(params[:id])
  end
end
