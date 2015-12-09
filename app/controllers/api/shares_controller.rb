class Api::SharesController < ApplicationController
  before_action :set_share, only: [:update, :destroy]

  def index
    @shares = current_user.sharings
  end
  def create
    @share = Share.new(share_params)
    if @share.save
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
    @share = current_user.sharings.find(params[:id])
  end
end
