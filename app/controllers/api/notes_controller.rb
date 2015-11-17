class Api::NotesController < ApplicationController
  before_action :set_note, only: [:show, :update, :destroy]


  def index
    @notes = Note.all
    render json: @notes
  end

  def show
    render json: @note
  end

  def create
    @note = Note.new(note_params)
    if @note.save
      render json: @note
    else
      render json: 422, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: 422, status: :unprocessable_entity
    end
  end

  def destroy
    @note.destroy
    render json: @note
  end
  private

  def note_params
    params.require(:note).permit(:title, :body, :user_id, :is_archived)
  end

  def set_note
    @note = Note.find(params[:id])
  end
end
