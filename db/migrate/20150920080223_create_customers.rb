class CreateCustomers < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.string :club_number

      t.string :first_name
      t.string :last_name
      t.string :first_name_kana
      t.string :last_name_kana

      t.string :gender
      t.date :birth

      t.string :email
      t.string :tel

      t.string :address

      t.text :note

      t.timestamps null: false
    end
  end
end
