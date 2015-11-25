class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?


  def current_user
    User.find_by_session_token(session[:session_token])
  end
  def resolve_tags(tags)

    tag_ids = []
    if tags
      tags.each do |tag|
        break if tag.length < 1
        existing_tag = Tag.find_by_tag(tag)
        if existing_tag
          tag_ids << existing_tag.id
        else
          tag = Tag.create!(tag: tag)
          tag_ids << tag.id
        end
      end
    return tag_ids
    else
      return []
    end

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
