class Api::NotebooksController < ApplicationController
  before_action :set_notebook, only: [:show, :update, :destroy]
  before_action :simulate_latency, except: [:index, :destroy]

  def index
    @notebooks = current_user.notebooks.order("updated_at DESC")
    render :index
  end

  def show
    if @notebook.user_id == current_user.id
      render :show
    else
      render json: 403, status: :forbidden
    end
  end

  def create
    @notebook = Notebook.new(notebook_params)
    @notebook.user_id = current_user.id
    if @notebook.save
      render :show
    else
      render json: 422, status: :unprocessable_entity
    end
  end

  def update
    if @notebook.update(notebook_params)
      render :show
    else
      render json: 422, status: :unprocessable_entity
    end
  end

  def destroy
    @notebook.destroy
    render :show
  end

  private
  def simulate_latency
    sleep(2)
  end

  def notebook_params
    params.require(:notebook).permit(:title, :description, :user_id)
  end

  def set_notebook
    @notebook = Notebook.find(params[:id])
  end
end
