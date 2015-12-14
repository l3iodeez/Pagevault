class Api::SharesController < ApplicationController
  before_action :set_share, only: [:update, :destroy]

  def index
    share_ids = current_user.sharing_ids
    @shares = Share.where("user_id = ? OR id IN (?)", current_user.id, share_ids)
  end
  def create
    @share = Share.new(share_params)
    if !logged_in? || @share.note.user.id != current_user.id
      render json: "FORBIDDEN", status: :forbidden
    elsif @share.save
      render :show
    else
      render json: 422, status: :unprocessable_entity
    end
  end
  def update
    if @share.update(share_params)
      render :show
    else
      render json: 422, status: :unprocessable_entity
    end
  end
  def destroy
    @share.destroy
    render :show
  end
  private
  def share_params
    params.require(:share).permit(:user_id, :note_id, :is_writable)
  end
  def set_share
    share_ids = current_user.sharing_ids
    @share = Share.where("user_id = ? OR id IN (?)", current_user.id, share_ids).find(params[:id])
  end
end
