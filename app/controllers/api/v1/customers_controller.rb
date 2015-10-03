class Api::V1::CustomersController < ApplicationController
  def index
    @data = Customer.all
  end

  def create
    @customer = Customer.create!(customer_params)
    render :show, status: :created
  end

  private

  def customer_params
    params.require(:customer).permit!
  end
end
