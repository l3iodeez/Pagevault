class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?


  def current_user
    User.find_by_session_token(session[:session_token])
  end
  def resolve_tags(tag_string)
    tags = tag_string.split(' ')
    tag_ids = []
    tags.each do |tag|
      tag_id = Tag.find_by_tag(tag)
      if tag_id
        tag_ids << tag_id
      else
        tag = Tag.create!(tag: tag)
        tag_ids << tag.id
      end
    end
    return tag_ids
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
      redirect_to new_api_session_url
    end
  end

  def verify_logged_out
    redirect_to root_url if logged_in?
  end

  def add_to_flash(message, type, now = false)
   if now
     flash.now[type] ||= []
     flash.now[type] << message
   else
     flash[type] ||= []
     flash[type] << message
   end
 end


 def errors_to_flash(object, now = false)
   object.errors.full_messages.each do |error|
     add_to_flash(error, :errors, now)
   end
 end


end
