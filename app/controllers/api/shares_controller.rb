class Api::SharesController < ApplicationController
  def index
    @shares = current_user.sharings
  end
end
