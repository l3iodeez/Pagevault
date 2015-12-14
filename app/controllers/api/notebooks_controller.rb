class Api::NotebooksController < ApplicationController
  before_action :set_notebook, only: [:show, :update, :destroy]
  before_action :simulate_latency, except: [:index, :destroy]

  def index
    @notebooks = current_user.notebooks.order("updated_at DESC").includes(:tags).includes(:notes)
    .concat(current_user.accessible_notebooks.order("updated_at DESC").includes(:tags).includes(:notes))
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
    @notebook.tag_ids = resolve_tags(params[:notebook][:tags])
    if @notebook.save
      render :show
    else
      render json: 422, status: :unprocessable_entity
    end
  end

  def update
    @notebook.tag_ids = resolve_tags(params[:notebook][:tags])
    if @notebook.update(notebook_params)
      render :show
    else
      render json: 422, status: :unprocessable_entity
    end
  end

  def destroy
    if @notebook.user.notebooks.count < 2
      render json: "You cannot delete your only notebook.", status: :unprocessable_entity
    else
      @notebook.destroy
      render :show
    end
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
