class Api::SearchController < ApplicationController
  def index
    byebug
    @results = current_user.notes.find_by_fuzzy_searchable(params[:query])
    render :index
  end
end
