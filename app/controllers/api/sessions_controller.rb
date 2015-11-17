class Api::SessionsController < ApplicationController

  before_action :verify_logged_in, only: [:destroy]
  before_action :verify_logged_out, only: [:new, :create]

  def new
    @user = User.new
    render :new
  end

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user
      login!(user)
      redirect_to root_url
    else
      @user = User.new(username: params[:user][:username])
      add_to_flash("Invalid username or password", :errors, true)
      render :new
    end
  end


  def destroy
      logout!
      add_to_flash("You have been logged out.", :errors)
      redirect_to new_api_session_url
  end
end
