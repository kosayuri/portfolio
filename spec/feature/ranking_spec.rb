require 'rails_helper'

RSpec.describe "game/index.html.erb", type: :feature do
  describe "ランキングページのテスト" do
    let!(:users) { create_list(:user, 5) }
    let(:ranking_users) { (users.sort { |a, b| b[:hiscore] <=> a[:hiscore] }) }

    it "ひま撃ちのリンクを正しく表示すること" do
      visit game_index_path
      expect(page).to have_link "ひま撃ち", href: root_path
    end

    it "ログイン時、プロフィール変更のリンクを正しく表示すること" do
      sign_in users.first
      visit game_index_path
      expect(page).to have_link "プロフィール変更", href: edit_user_registration_path
    end

    it "ログイン時、ログアウトのリンクを正しく表示すること" do
      sign_in users.first
      visit game_index_path
      expect(page).to have_link "ログアウト", href: destroy_user_session_path
    end

    it "アカウント登録のリンクを正しく表示すること" do
      visit game_index_path
      expect(page).to have_link "アカウント登録", href: new_user_registration_path
    end

    it "ログインのリンクを正しく表示すること" do
      visit game_index_path
      expect(page).to have_link "ログイン", href: new_user_session_path
    end

    it "ホーム画面に移動のリンクを正しく表示すること" do
      visit game_index_path
      expect(page).to have_link "ホーム画面に移動", href: root_path
    end

    it "トップへ移動のリンクを正しく表示すること" do
      visit game_index_path
      expect(page).to have_link "トップへ移動", href: "#header"
    end

    it "ランキングの順位を正しく表示すること" do
      visit game_index_path
      ranking_users.each_with_index do |_user, i|
        expect(page).to have_selector "tr:nth-child(#{i + 2})", text: (i + 1).to_s
      end
    end

    it "ランキングの順番でアバターを表示すること" do
      visit game_index_path
      ranking_users.each_with_index do |user, i|
        within(:css, "tr:nth-child(#{i + 2})") do
          expect(page).to have_selector "img[src$='#{user.avatar.url}']"
        end
      end
    end

    it "ユーザー名がユーザー詳細ページのリンクとして正しく表示すること" do
      visit game_index_path
      ranking_users.all? do |user|
        expect(page).to have_link user.name, href: game_path(id: user.id)
      end
    end

    it "ランキングの順番で名前を表示すること" do
      visit game_index_path
      ranking_users.each_with_index do |user, i|
        expect(page).to have_selector "tr:nth-child(#{i + 2})", text: user.name.to_s
      end
    end

    it "ランキングの順番でハイスコアを表示すること" do
      visit game_index_path
      ranking_users.each_with_index do |user, i|
        expect(page).to have_selector "tr:nth-child(#{i + 2})", text: user.hiscore.to_s
      end
    end

    it "ログインユーザー用の行にログインユーザーの名前を表示すること" do
      sign_in users.first
      visit game_index_path
      within(:css, "tr[class='current-user-ranking']") do
        expect(page).to have_selector "td", text: users.first.name.to_s
      end
    end

    it "未ログイン時にログインユーザー用の行を表示しないこと" do
      visit game_index_path
      expect(page).to have_no_selector "tr", class: "current-user-ranking"
    end
  end
end
