class Api::ImageUploadsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def new
    @image_upload = ImageUpload.new
    render :new
  end

  def show
    @image_upload = ImageUpload.find(params[:id])
    redirect_to @image_upload.image.url
  end

  def create
    @image_upload = ImageUpload.new(image: params[:file], note_id: params[:note_id].to_i)
    if @image_upload.save
      render :show
    else
      render json: @image_upload.errors.fullmessages
    end
  end
  def image_upload_params
    params.require(:image_upload).permit(:note_id, :image)
  end
end
