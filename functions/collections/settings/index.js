const { firestore } = require("../../config");

const fetchSettings = async () => {
  const settings = await firestore.doc("settings/default").get();
  return settings.data();
};

const updateSetting = async (settingId, setting) => await firestore.doc(`settings/${settingId}`).update(setting);

const fetchTemplates = async (templateName) => {
  const templates_ = await firestore.doc("settings/templates").get();
  const templateDate = templates_.data();

  if (templateDate) return templateDate[templateName];
};

module.exports = { fetchSettings, updateSetting, fetchTemplates };
