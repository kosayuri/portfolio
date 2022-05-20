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

    it "素材提供者様のリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "素材提供者様", href: "#material-provider"
    end

    it "『nakano sound』のリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "『nakano sound』", href: "https://www.nakano-sound.com"
    end

    it "https://www.nakano-sound.comのリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "https://www.nakano-sound.com", href: "https://www.nakano-sound.com"
    end

    it "『創作堂さくら紅葉』のリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "『創作堂さくら紅葉』", href: "https://yukizakura.net/"
    end

    it "https://yukizakura.net/のリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "https://yukizakura.net/", href: "https://yukizakura.net/"
    end

    it "『魔王魂』のリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "『魔王魂』", href: "https://maou.audio/"
    end

    it "https://maou.audio/のリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "https://maou.audio/", href: "https://maou.audio/"
    end

    it "『効果音ラボ』のリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "『効果音ラボ』", href: "https://soundeffect-lab.info/"
    end

    it "https://soundeffect-lab.info/のリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "https://soundeffect-lab.info/", href: "https://soundeffect-lab.info/"
    end

    it "『フリー効果音素材 くらげ工匠』のリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "『フリー効果音素材 くらげ工匠』", href: "http://www.kurage-kosho.info/"
    end

    it "http://www.kurage-kosho.info/のリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "http://www.kurage-kosho.info/", href: "http://www.kurage-kosho.info/"
    end

    it "『On-Jin ～音人～』のリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "『On-Jin ～音人～』", href: "https://on-jin.com/"
    end

    it "https://on-jin.com/のリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "https://on-jin.com/", href: "https://on-jin.com/"
    end

    it "『Presys net.』のリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "『Presys net.』", href: "https://www.presys.jp/"
    end

    it "https://www.presys.jp/のリンクを正しく表示すること" do
      visit root_url
      expect(page).to have_link "https://www.presys.jp/", href: "https://www.presys.jp/"
    end
  end
end
