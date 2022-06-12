require 'rails_helper'

RSpec.describe "game/new.html.erb", type: :feature do
  describe "ゲームプレイページのテスト" do
    let(:user) { create(:user) }

    context "PCでアクセスした場合" do
      before do
        sign_in user
        visit new_game_path()
      end

      it "メニューボタンを表示しないこと" do
        expect(page).to have_no_selector "h2", text: "メニュー"
      end

      it "攻撃ボタンを表示しないこと" do
        expect(page).to have_no_selector "img[src*='ターゲットのアイコン']"
      end

      it "上に移動するボタンを表示しないこと" do
        expect(page).to have_no_selector "#touch-character-up[src*='矢印ボタン左']"
      end

      it "左に移動するボタンを表示しないこと" do
        expect(page).to have_no_selector "#touch-character-left[src*='矢印ボタン左']"
      end

      it "右に移動するボタンを表示しないこと" do
        expect(page).to have_no_selector "#touch-character-right[src*='矢印ボタン左']"
      end

      it "下に移動するボタンを表示しないこと" do
        expect(page).to have_no_selector "#touch-character-down[src*='矢印ボタン左']"
      end
    end

    context "モバイルでアクセスした場合" do
      before do
        sign_in user
        user_agent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) CriOS/38.0.2125.67 Mobile/12B411 Safari/600.1.4'
        Capybara.current_session.driver.header('User-Agent', user_agent)
        visit new_game_path()
      end

      it "メニューボタンを正しく表示すること" do
        expect(page).to have_selector "h2", text: "メニュー"
      end

      it "攻撃ボタンを正しく表示すること" do
        expect(page).to have_selector "img[src*='ターゲットのアイコン']"
      end

      it "上に移動するボタンを正しく表示すること" do
        expect(page).to have_selector "#touch-character-up[src*='矢印ボタン左']"
      end

      it "左に移動するボタンを正しく表示すること" do
        expect(page).to have_selector "#touch-character-left[src*='矢印ボタン左']"
      end

      it "右に移動するボタンを正しく表示すること" do
        expect(page).to have_selector "#touch-character-right[src*='矢印ボタン左']"
      end

      it "下に移動するボタンを正しく表示すること" do
        expect(page).to have_selector "#touch-character-down[src*='矢印ボタン左']"
      end
    end
  end
end
