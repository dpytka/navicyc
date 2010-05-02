# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_navicyc_session',
  :secret      => 'c853f9915676dc49d0aa3b67cb0a54a3eae201c2a9bbcf8efc2db14ca90ceb25056ac0d72ce6196f464adc2844702b7210266a9cab086a5cf2cac364ad567168'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
