class PollSettings {
  static POLL_PRIVACY = {
    PUBLIC: 'pb',
    PRIVATE: 'pr',
  };

  static POLL_ITEM_FORMAT = {
    TEXT: 't',
    TEXT_WITH_IMAGE: 'ti',
    TEXT_WITH_IMAGES: 'ti*',
    TEXT_WITH_VIDEO: 'tv',
  };

  static defaultPollSettings = {
    endDatetime: undefined,
    privacy: PollSettings.POLL_PRIVACY.PUBLIC,
    itemFormat: PollSettings.POLL_ITEM_FORMAT.TEXT,
  };

  constructor(_settings) {
    if (!_settings.startDatetime || !_settings.creatorId || !_settings.title) {
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