class PollSettings {
  static POLL_ITEM_FORMAT = {
    TEXT: 'T',
    TEXT_WITH_IMAGE: 'TI',
    TEXT_WITH_IMAGES: 'TII',
    TEXT_WITH_VIDEO: 'TV',
  };

  static defaultPollSettings = {
    itemFormat: PollSettings.POLL_ITEM_FORMAT.TEXT,
  };

  constructor(_settings) {
    if (!_settings.creatorId || !_settings.title) {
      throw new Error('cannot create poll settings');
    }

    let settings = Object.assign({}, PollSettings.defaultPollSettings, _settings);
    for (let key in settings) {
      if (settings.hasOwnProperty(key)) {
        this[key] = settings[key];
      }
    }
  };
}

export default PollSettings;