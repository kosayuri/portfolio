require 'rails_helper'

RSpec.describe "game/show.html.erb", type: :feature do
  describe "ユーザー詳細ページのテスト" do
    let!(:user) { create(:user) }

    it "ひま撃ちのリンクを正しく表示すること" do
      visit game_path(id: user.id)
      expect(page).to have_link "ひま撃ち", href: root_path
    end

    it "ログイン時、プロフィール変更のリンクを正しく表示すること" do
      sign_in user
      visit game_path(id: user.id)
      expect(page).to have_link "プロフィール変更", href: edit_user_registration_path
    end

    it "ログイン時、ログアウトのリンクを正しく表示すること" do
      sign_in user
      visit game_path(id: user.id)
      expect(page).to have_link "ログアウト", href: destroy_user_session_path
    end

    it "アカウント登録のリンクを正しく表示すること" do
      visit game_path(id: user.id)
      expect(page).to have_link "アカウント登録", href: new_user_registration_path
    end

    it "ログインのリンクを正しく表示すること" do
      visit game_path(id: user.id)
      expect(page).to have_link "ログイン", href: new_user_session_path
    end

    it "ホーム画面に移動のリンクを正しく表示すること" do
      visit game_path(id: user.id)
      expect(page).to have_link "ホーム画面に移動", href: root_path
    end

    it "ランキングのリンクを正しく表示すること" do
      visit game_path(id: user.id)
      expect(page).to have_link "ランキング", href: game_index_path
    end

    it "ユーザーの名前を正しく表示すること" do
      visit game_path(id: user.id)
      expect(page).to have_selector "h2", text: user.name
    end

    it "ユーザーのアバターを正しく表示すること" do
      visit game_path(id: user.id)
      expect(page).to have_selector "img[src$='#{user.avatar.url}']"
    end

    it "ユーザーのハイスコアを正しく表示すること" do
      visit game_path(id: user.id)
      expect(page).to have_selector "h3", text: user.hiscore
    end

    it "ユーザーのコメントを正しく表示すること" do
      visit game_path(id: user.id)
      expect(page).to have_selector "h3", text: user.comment
    end

    it "存在しないユーザーを指定した場合、フッラシュメッセージを表示すること" do
      visit game_path(id: user.id + 1)
      expect(page).to have_selector "p", text: "指定のユーザーが存在しなかったため、ランキングページに戻りました。"
    end
  end
end
