FactoryBot.define do
  factory :user do
    name { "test" }
    sequence(:email) { |n| "TEST#{n}@example.com" }
    password { "testuser" }
    comment { "testcomment" }
    reset_password_token { "resettoken" }
  end
end
