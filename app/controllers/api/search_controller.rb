class Api::SearchController < ApplicationController
  def index
    user_id = current_user.id
    if params[:model] == "Note"
      @results = Note.find_by_fuzzy_searchable(params[:query], limit: 100).reject {|note| note.user_id != user_id}
      render :index
    else
      @users = User.find_by_fuzzy_contact(params[:query], limit: 100)
      render '/api/users/index'
    end
  end
end
