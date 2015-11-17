class Api::UsersController < ApplicationController

  before_action :set_user, only: [:update, :destroy]
  before_action :verify_logged_in, except: [:new, :create]
  before_action :verify_logged_out, only: [:new, :create]

  def create
    @user = User.new(user_params)
    byebug
    if @user.save
      login!(@user)
      render json: @user
    else
      render json: 422, status: :unprocessable_entity
    end
  end

  def show
    render json: current_user
  end


  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: 422, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    render json: @user
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end

  def set_user
    @user = current_user
    # @user = User.find(params[:id])
  end
end
