class Api::NotesController < ApplicationController
  before_action :set_note, only: [:show, :update, :destroy]


  def index
    @notes = current_user.notes.order("updated_at DESC")
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
    if @note.save
      render :show
    else
      render json: 422, status: :unprocessable_entity
    end
  end

  def update
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

  def note_params
    params.require(:note).permit(:title, :body, :user_id, :is_archived)
  end

  def set_note
    @note = Note.find(params[:id])
  end
end
