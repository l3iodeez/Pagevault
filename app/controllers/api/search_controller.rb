class Api::SearchController < ApplicationController
  def index
    user_id = current_user.id

    @results = Note.find_by_fuzzy_searchable(params[:query], limit: 100).reject {|note| note.user_id != user_id}
    render :index
  end
end
