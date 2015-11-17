class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


  def current_user
    User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def verify_logged_in
    unless logged_in?
      add_to_flash("You must be logged in to do that.", :errors)
      redirect_to new_session_url
    end
  end

  def verify_logged_out
    redirect_to user_url(current_user) if logged_in?
  end

  
end
