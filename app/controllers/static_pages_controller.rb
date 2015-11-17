class StaticPagesController < ApplicationController
  before_action :verify_logged_in
  def root
  end
end
