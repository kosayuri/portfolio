# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
Rails.application.config.assets.precompile += %w( game.js )
Rails.application.config.assets.precompile += %w( engine/game_instance.js )
Rails.application.config.assets.precompile += %w( engine/sound.js )
Rails.application.config.assets.precompile += %w( engine/enemy.js )
Rails.application.config.assets.precompile += %w( engine/boss.js )
Rails.application.config.assets.precompile += %w( engine/enemy_shot.js )
Rails.application.config.assets.precompile += %w( engine/stage.js )
Rails.application.config.assets.precompile += %w( engine/menu.js )
Rails.application.config.assets.precompile += %w( engine/character.js )
Rails.application.config.assets.precompile += %w( engine/character_bullet.js )
Rails.application.config.assets.precompile += %w( engine/effect.js )
Rails.application.config.assets.precompile += %w( engine/screen_effect.js )
Rails.application.config.assets.precompile += %w( engine/item.js )
Rails.application.config.assets.precompile += %w( engine/out.js )
Rails.application.config.assets.precompile += %w( engine/image_load.js )
Rails.application.config.assets.precompile += %w( engine/draw.js )
