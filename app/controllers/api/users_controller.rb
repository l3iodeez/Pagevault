class Api::UsersController < ApplicationController

  before_action :set_user, only: [:update, :destroy]
  before_action :verify_logged_in, except: [:create]
  before_action :verify_logged_out, only: [:create]

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      redirect_to user_url(@user)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    render json: current_user
  end


  def update
    if @user.update(user_params)
      redirect_to user_url(@user)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    redirect_to root_url
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
