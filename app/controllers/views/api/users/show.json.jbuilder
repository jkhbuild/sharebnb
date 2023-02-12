json.user do
    json.extract! @user, :id, :first_name, :last_name, :email, :birth_date, :phone_number, :created_at, :updated_at
end