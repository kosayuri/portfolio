FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "testname#{n}" }
    sequence(:email) { |n| "TEST#{n}@example.com" }
    password { "testuser" }
    comment { "testcomment" }
    sequence(:hiscore) { |n| n }
    avatar { Rack::Test::UploadedFile.new(File.join('spec', 'fixtures', 'test.png')) }
    se_volume { 10 }
    bgm_volume { 10 }
  end
end
