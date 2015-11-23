class Api::SessionsController < ApplicationController

  # before_action :verify_logged_in, only: [:destroy]
  # before_action :verify_logged_out, only: [:new, :create]

  def show
    if logged_in?
      @user = current_user
      render '/api/users/show'
    else
      render json: {}, status: 200
    end
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if !@user.nil?
      login!(@user)
      render '/api/users/show'
    else
      render json: {errors: ["Invalid email or password."]}, status: 401
    end
  end


  def destroy
    logout!
    render json: {errors: ["You have been logged out."]}
  end
end
