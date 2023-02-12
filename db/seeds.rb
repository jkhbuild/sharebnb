ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    first_name: 'demo',
    last_name: 'user',
    birth_date: 20230211,
    email: 'demo@user.io', 
    password: 'password',
    phone_number: "888-888-8888"
  )

  puts "Done!"
end