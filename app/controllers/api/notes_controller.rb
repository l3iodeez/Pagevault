class Api::NotesController < ApplicationController
  before_action :set_note, only: [:show, :update, :destroy]
  # before_action :simulate_latency, except: [:index, :destroy]

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
    if @note.save
      render :show
    else
      render json: 422, status: :unprocessable_entity
    end
  end

  def update
    @note.tag_ids = resolve_tags(params[:note][:tags])
    if @note.update(note_params)
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
    sleep(2)
  end

  def note_params
    params.require(:note).permit(:title, :body, :user_id, :notebook_id, :is_archived)
  end

  def set_note
    @note = Note.find(params[:id])
  end
end
