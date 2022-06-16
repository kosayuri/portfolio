require 'rails_helper'

RSpec.describe "home/index.html.erb", type: :feature do
  describe "トップページのテスト" do
    let(:user) { create(:user) }
    let(:game_status) { { hiscore: user.hiscore, se_volume: user.se_volume, bgm_volume: user.bgm_volume } }

    context "ログインしている場合" do
      before do
        sign_in user
        visit root_url
      end

      it "ひま撃ちのリンクを正しく表示すること" do
        expect(page).to have_link "ひま撃ち", href: root_path
      end

      it "プロフィール変更のリンクを正しく表示すること" do
        expect(page).to have_link "プロフィール変更", href: edit_user_registration_path
      end

      it "ログアウトのリンクを正しく表示すること" do
        expect(page).to have_link "ログアウト", href: destroy_user_session_path
      end

      it "アカウント登録のリンクを表示しないこと" do
        expect(page).to have_no_link "アカウント登録", href: new_user_registration_path
      end

      it "ログインのリンクを表示しないこと" do
        expect(page).to have_no_link "ログイン", href: new_user_session_path
      end

      it "ゲストログインのリンクを表示しないこと" do
        expect(page).to have_no_link "ゲストログイン", href: users_guest_sign_in_path
      end

      it "ゲームスタートのリンクを正しく表示すること" do
        expect(page).to have_link "ゲームスタート", href: new_game_path(game_status)
      end

      it "設定のリンクを正しく表示すること" do
        expect(page).to have_link "設定", href: edit_game_path(user.id)
      end

      it "ランキングのリンクを正しく表示すること" do
        expect(page).to have_link "ランキング", href: game_index_path
      end

      it "遊び方のリンクを正しく表示すること" do
        expect(page).to have_link "遊び方", href: "#operation-explanation"
      end

      it "素材提供者様のリンクを正しく表示すること" do
        expect(page).to have_link "素材提供者様", href: "#material-provider"
      end

      it "遊び方欄のトップへ移動のリンクを正しく表示すること" do
        within(:css, 'div[id="operation-explanation"]') do
          expect(page).to have_link "トップへ移動", href: "#header"
        end
      end

      it "『nakano sound』のリンクを正しく表示すること" do
        expect(page).to have_link "『nakano sound』", href: "https://www.nakano-sound.com"
      end

      it "https://www.nakano-sound.comのリンクを正しく表示すること" do
        expect(page).to have_link "https://www.nakano-sound.com", href: "https://www.nakano-sound.com"
      end

      it "『創作堂さくら紅葉』のリンクを正しく表示すること" do
        expect(page).to have_link "『創作堂さくら紅葉』", href: "https://yukizakura.net/"
      end

      it "https://yukizakura.net/のリンクを正しく表示すること" do
        expect(page).to have_link "https://yukizakura.net/", href: "https://yukizakura.net/"
      end

      it "『魔王魂』のリンクを正しく表示すること" do
        expect(page).to have_link "『魔王魂』", href: "https://maou.audio/"
      end

      it "https://maou.audio/のリンクを正しく表示すること" do
        expect(page).to have_link "https://maou.audio/", href: "https://maou.audio/"
      end

      it "『効果音ラボ』のリンクを正しく表示すること" do
        expect(page).to have_link "『効果音ラボ』", href: "https://soundeffect-lab.info/"
      end

      it "https://soundeffect-lab.info/のリンクを正しく表示すること" do
        expect(page).to have_link "https://soundeffect-lab.info/", href: "https://soundeffect-lab.info/"
      end

      it "『フリー効果音素材 くらげ工匠』のリンクを正しく表示すること" do
        expect(page).to have_link "『フリー効果音素材 くらげ工匠』", href: "http://www.kurage-kosho.info/"
      end

      it "http://www.kurage-kosho.info/のリンクを正しく表示すること" do
        expect(page).to have_link "http://www.kurage-kosho.info/", href: "http://www.kurage-kosho.info/"
      end

      it "『On-Jin ～音人～』のリンクを正しく表示すること" do
        expect(page).to have_link "『On-Jin ～音人～』", href: "https://on-jin.com/"
      end

      it "https://on-jin.com/のリンクを正しく表示すること" do
        expect(page).to have_link "https://on-jin.com/", href: "https://on-jin.com/"
      end

      it "『Presys net.』のリンクを正しく表示すること" do
        expect(page).to have_link "『Presys net.』", href: "https://www.presys.jp/"
      end

      it "https://www.presys.jp/のリンクを正しく表示すること" do
        expect(page).to have_link "https://www.presys.jp/", href: "https://www.presys.jp/"
      end

      it "素材提供者様欄のトップへ移動のリンクを正しく表示すること" do
        within(:css, 'div[id="material-provider"]') do
          expect(page).to have_link "トップへ移動", href: "#header"
        end
      end

      it "モバイル操作方法の画像を表示しないこと" do
        expect(page).to have_no_selector "img[src*='モバイル操作方法']"
      end

      it "プレイ時は画面を横表示にを表示しないこと" do
        expect(page).to have_no_selector "p", text: "プレイ時は画面を横表示に"
      end

      it "PC操作方法の画像を正しく表示すること" do
        expect(page).to have_selector "img[src*='PC操作方法']"
      end
    end

    context "ログインしていない場合" do
      before do
        visit root_url
      end

      it "ひま撃ちのリンクを正しく表示すること" do
        expect(page).to have_link "ひま撃ち", href: root_path
      end

      it "アカウント登録のリンクを正しく表示すること" do
        expect(page).to have_link "アカウント登録", href: new_user_registration_path
      end

      it "ログインのリンクを正しく表示すること" do
        expect(page).to have_link "ログイン", href: new_user_session_path
      end

      it "プロフィール変更のリンクを表示しないこと" do
        expect(page).to have_no_link "プロフィール変更", href: edit_user_registration_path
      end

      it "ログアウトのリンクを表示しないこと" do
        expect(page).to have_no_link "ログアウト", href: destroy_user_session_path
      end

      it "ランキングのリンクを正しく表示すること" do
        expect(page).to have_link "ランキング", href: game_index_path
      end

      it "遊び方のリンクを正しく表示すること" do
        expect(page).to have_link "遊び方", href: "#operation-explanation"
      end

      it "素材提供者様のリンクを正しく表示すること" do
        expect(page).to have_link "素材提供者様", href: "#material-provider"
      end

      it "遊び方欄のトップへ移動のリンクを正しく表示すること" do
        within(:css, 'div[id="operation-explanation"]') do
          expect(page).to have_link "トップへ移動", href: "#header"
        end
      end

      it "ゲストログインのリンクを表示すること" do
        expect(page).to have_link "ゲストログイン", href: users_guest_sign_in_path
      end

      it "ゲームスタートのリンクを表示しないこと" do
        expect(page).to have_no_link "ゲームスタート", href: new_game_path(game_status)
      end

      it "設定のリンクを表示しないこと" do
        expect(page).to have_no_link "設定", href: edit_game_path(user.id)
      end

      it "『nakano sound』のリンクを正しく表示すること" do
        expect(page).to have_link "『nakano sound』", href: "https://www.nakano-sound.com"
      end

      it "https://www.nakano-sound.comのリンクを正しく表示すること" do
        expect(page).to have_link "https://www.nakano-sound.com", href: "https://www.nakano-sound.com"
      end

      it "『創作堂さくら紅葉』のリンクを正しく表示すること" do
        expect(page).to have_link "『創作堂さくら紅葉』", href: "https://yukizakura.net/"
      end

      it "https://yukizakura.net/のリンクを正しく表示すること" do
        expect(page).to have_link "https://yukizakura.net/", href: "https://yukizakura.net/"
      end

      it "『魔王魂』のリンクを正しく表示すること" do
        expect(page).to have_link "『魔王魂』", href: "https://maou.audio/"
      end

      it "https://maou.audio/のリンクを正しく表示すること" do
        expect(page).to have_link "https://maou.audio/", href: "https://maou.audio/"
      end

      it "『効果音ラボ』のリンクを正しく表示すること" do
        expect(page).to have_link "『効果音ラボ』", href: "https://soundeffect-lab.info/"
      end

      it "https://soundeffect-lab.info/のリンクを正しく表示すること" do
        expect(page).to have_link "https://soundeffect-lab.info/", href: "https://soundeffect-lab.info/"
      end

      it "『フリー効果音素材 くらげ工匠』のリンクを正しく表示すること" do
        expect(page).to have_link "『フリー効果音素材 くらげ工匠』", href: "http://www.kurage-kosho.info/"
      end

      it "http://www.kurage-kosho.info/のリンクを正しく表示すること" do
        expect(page).to have_link "http://www.kurage-kosho.info/", href: "http://www.kurage-kosho.info/"
      end

      it "『On-Jin ～音人～』のリンクを正しく表示すること" do
        expect(page).to have_link "『On-Jin ～音人～』", href: "https://on-jin.com/"
      end

      it "https://on-jin.com/のリンクを正しく表示すること" do
        expect(page).to have_link "https://on-jin.com/", href: "https://on-jin.com/"
      end

      it "『Presys net.』のリンクを正しく表示すること" do
        expect(page).to have_link "『Presys net.』", href: "https://www.presys.jp/"
      end

      it "https://www.presys.jp/のリンクを正しく表示すること" do
        expect(page).to have_link "https://www.presys.jp/", href: "https://www.presys.jp/"
      end

      it "素材提供者様欄のトップへ移動のリンクを正しく表示すること" do
        within(:css, 'div[id="material-provider"]') do
          expect(page).to have_link "トップへ移動", href: "#header"
        end
      end

      it "モバイル操作方法の画像を表示しないこと" do
        expect(page).to have_no_selector "img[src*='モバイル操作方法']"
      end

      it "プレイ時は画面を横表示にを表示しないこと" do
        expect(page).to have_no_selector "p", text: "プレイ時は画面を横表示に"
      end

      it "PC操作方法の画像を正しく表示すること" do
        expect(page).to have_selector "img[src*='PC操作方法']"
      end
    end

    context "モバイルでアクセスした場合" do
      before do
        user_agent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) CriOS/38.0.2125.67 Mobile/12B411 Safari/600.1.4'
        Capybara.current_session.driver.header('User-Agent', user_agent)
        visit root_url
      end

      it "モバイル操作方法の画像を正しく表示すること" do
        expect(page).to have_selector "img[src*='モバイル操作方法']"
      end

      it "プレイ時は画面を横表示にを正しく表示すること" do
        expect(page).to have_selector "p", text: "プレイ時は画面を横表示に"
      end

      it "PC操作方法の画像を表示しないこと" do
        expect(page).to have_no_selector "img[src*='PC操作方法']"
      end
    end
  end
end
