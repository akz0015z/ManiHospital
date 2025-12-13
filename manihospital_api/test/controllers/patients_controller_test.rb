require "test_helper"

class PatientsControllerTest < ActionDispatch::IntegrationTest

  # Setup custom test patients 
  setup do
    @patient_lucian = Patient.create!(
      name: "Lucian",
      age: 23,
      condition: "Arm Problem",
      doctor: "Liam Walker",
      room: 12,
      status: "Admitted"
    )

    @patient_sophia = Patient.create!(
      name: "Sophia",
      age: 19,
      condition: "Migraine",
      doctor: "Ava Collins",
      room: 34,
      status: "Discharged"
    )
  end

  # TEST: GET /patients
 
  test "should get index" do
    get patients_url
    assert_response :success
  end

  # Using a NEW real-looking patient from your dataset
  
  test "should create new patient" do
    assert_difference("Patient.count") do
      post patients_url, params: {
        patient: {
          name: "Phil",
          age: 47,
          condition: "High Fever",
          doctor: "Liam Walker",
          room: 6,
          status: "Admitted"
        }
      }
    end

    assert_response :created
  end

 
  # Updating Lucian’s doctor + condition realistically
  
  test "should update patient" do
    put patient_url(@patient_lucian), params: {
      patient: {
        name: "Lucian Updated",
        condition: "Fractured Arm",
        doctor: "Sophia Ramirez"
      }
    }

    assert_response :success
    @patient_lucian.reload
    assert_equal "Lucian Updated", @patient_lucian.name
    assert_equal "Fractured Arm", @patient_lucian.condition
    assert_equal "Sophia Ramirez", @patient_lucian.doctor
  end

  # Deleting Sophia from the DB
  
  test "should delete patient" do
    assert_difference("Patient.count", -1) do
      delete patient_url(@patient_sophia)
    end

    assert_response :success
  end

end
