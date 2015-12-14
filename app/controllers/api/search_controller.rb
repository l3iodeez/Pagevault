class Api::SearchController < ApplicationController
  def index
    user_id = current_user.id
    if params[:model] == "Note"
      @results = Note.find_by_fuzzy_searchable(params[:query], limit: 100).select do |note|
        (note.user_id == user_id) || current_user.accessible_note_ids.include?(note.id)
      end
      render :index
    else
      @users = User.find_by_fuzzy_contact(params[:query], limit: 100)
      @users = @users.reject {|user| user.id == current_user.id}
      render '/api/users/index'
    end
  end
end
