function assignAgeGroups(birthDayMiladi, ageGroups) {
  return ageGroups.filter((ageGroup) => ageGroup.toDateMiladi > birthDayMiladi && ageGroup.fromDateMiladi < birthDayMiladi);
}

module.exports = { assignAgeGroups };
