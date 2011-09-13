# Get the directory that this configuration file exists in
dir = File.dirname(__FILE__)

# Load the sencha-touch and touch-charts frameworks automatically.
load File.join(dir, '..', '..', '..', 'touch', 'resources', 'themes')
load File.join(dir, '..', 'themes')

# Compass configurations
sass_path = dir
css_path = File.join(dir, "..", "css")

# Require any additional compass plugins here.
environment  = :production
output_style = :compressed
