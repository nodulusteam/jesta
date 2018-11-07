const path = require('path');
const chromeDriver = path.resolve(path.join(process.cwd(), '/node_modules/chromedriver/lib/chromedriver/chromedriver.exe'));

module.exports = {
    'test_settings': {
        'default': {
            'launch_url': 'http://localhost:6690',
            'selenium_port': 4444,
            'selenium_host': 'localhost',
            'silent': false,
            'screenshots': {
                'enabled': false,
                'path': ''
            },
            'desiredCapabilities': {
                'browserName': 'chrome',
                'javascriptEnabled': true,
                'marionette': true,
                'chromeOptions': {
                    'args': []
                }
            }
        },
        'chrome': {
            'desiredCapabilities': {
                'browserName': 'chrome',
            }
        },
        'edge': {
            'desiredCapabilities': {
                'browserName': 'MicrosoftEdge'
            }
        }
    },
    'src_folders': [
        'e2e'
    ],
    'output_folder': 'reports',
    'custom_commands_path': '',
    'custom_assertions_path': '',
    'page_objects_path': '',
    'globals_path': '',
    'selenium': {
        'start_process': true,
        'server_path': 'node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.14.0.jar',
        'log_path': '',
        'port': 4444,
        'cli_args': {
            'webdriver.chrome.driver': chromeDriver,
            'webdriver.gecko.driver': '',
            'webdriver.edge.driver': ''
        }
    }
}