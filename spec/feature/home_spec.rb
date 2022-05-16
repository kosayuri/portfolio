require 'rails_helper'

RSpec.describe "home/index.html.erb", type: :feature do
  describe "トップページのテスト" do
    let(:user) { create(:user) }

    it "ひま撃ちのリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "ひま撃ち", href: root_path
    end

    it "ログイン時、プロフィール変更のリンクを正しく表示すること" do
      sign_in user
      visit root_url
      expect(page).to have_link "プロフィール変更", href: edit_user_registration_path
    end

    it "ログイン時、ログアウトのリンクを正しく表示すること" do
      sign_in user
      visit root_url
      expect(page).to have_link "ログアウト", href: destroy_user_session_path
    end

    it "アカウント登録のリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "アカウント登録", href: new_user_registration_path
    end

    it "ログインのリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "ログイン", href: new_user_session_path
    end

    it "ゲームスタートのリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "ゲームスタート", href: "#"
    end

    it "ランキングのリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "ランキング", href: "#"
    end

    it "操作方法のリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "操作方法", href: "#"
    end

    it "著作権表記のリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "著作権表記", href: "#"
    end
  end
end
