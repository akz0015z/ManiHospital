require "test_helper"

class PatientTest < ActiveSupport::TestCase
  
  test "should not save patient without name" do
    patient = Patient.new(age: 20, condition: "Pain", doctor: "Smith", room: 10, status: "Admitted")
    assert_not patient.save, "Saved patient without a name"
  end

  test "should save valid patient" do
    patient = Patient.new(
      name: "Valid User",
      age: 22,
      condition: "Fever",
      doctor: "Dr. Who",
      room: 8,
      status: "Admitted"
    )
    assert patient.save, "Did not save valid patient"
  end

end
