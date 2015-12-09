class Api::UsersController < ApplicationController

  before_action :set_user, only: [:update, :destroy]

  def index
    if logged_in?
      @users = []
      5.times do
        @users << User.all.sample
      end
      render :index
    else
      render json: "FORBIDDEN", status: :forbidden
    end
  end
  def create
    @user = User.new(user_params)
    if @user.save
      @user.notebooks.create!(title: "#{@user.name}'s Notebook'")
      login!(@user)
      render json: @user
    else
      render json: {errors: @user.errors.full_messages} , status: :unprocessable_entity
    end
  end

  def show
    render json: current_user
  end


  def update
    if !logged_in?
      render json: "FORBIDDEN", status: :forbidden
    elsif @user.update(user_params)
      render json: @user
    else
      render json: {errors: @user.errors.full_messages} , status: :unprocessable_entity
    end
  end

  def destroy
    # @user.destroy
    # render json: @user
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :name, :hide_encrypt_warning)
  end

  def set_user
    @user = current_user
    # @user = User.find(params[:id])
  end
end
