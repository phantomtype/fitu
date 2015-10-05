json.data(@data) { |d| json.extract!(d, :first_name, :last_name, :first_name_kana, :last_name_kana,
                  :gender, :age, :birth, :email, :tel, :address, :note) }
