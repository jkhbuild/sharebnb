class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['firstName'] + ['lastName'] + ['email'] + ['birthDate'] + ['password'] + ['phoneNumber']
  before_action :require_logged_out, only: [:create]

  def create
      @user = User.new(user_params)

      if @user.save
          login(@user)
          render :show
      else
          render json: @user.errors.full_messages, status: 422
      end
  end

  private
  
  def user_params
    params.require(:user).permit(:first_name, :last_name, :birth_date, :email, :password, :phone_number)
  end

end
