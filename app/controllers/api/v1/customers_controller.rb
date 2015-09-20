class Api::V1::CustomersController < ApplicationController
  def index
    @data = Customer.all
  end

  def create
    @customer = Customer.create(customer_params)
    render :show, status: :created
  end

  private

  def customer_params
    params.permit(:first_name, :last_name, :first_name_kana, :last_name_kana,
                  :gender, :birth, :email, :tel, :address, :note)
  end
end
