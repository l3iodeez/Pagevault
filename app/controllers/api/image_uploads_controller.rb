class Api::ImageUploadsController < ApplicationController
  def new
    @image_upload = ImageUpload.new
    render :new
  end

  def show
    @image_upload = ImageUpload.find(params[:id])
    render :show
  end

  def create
    @image = ImageUpload.new(image_upload_params)
    if @image.save
      render show: @image
    else
      render html: @image.errors.fullmessages
    end
  end
  def image_upload_params
    params.require(:image_upload).permit(:note_id, :image)
  end
end
