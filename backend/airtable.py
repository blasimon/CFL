import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
import requests


load_dotenv()

app = Flask(__name__)


# Replace 'YOUR_TOKEN' with your actual Airtable API key
# api_key = os.getenv('AIRTABLE_API_KEY')
# base_id = os.getenv('AIRTABLE_BASE_ID')

api_key=os.getenv('AIRTABLE_API_KEY')
base_id=os.getenv('AIRTABLE_BASE_ID')


# # Create an instance of the Api object
import pyairtable
from pyairtable import Api
from pyairtable.formulas import match

# Airtable table names
STUDIES_TABLE_NAME = 'Studies'
VERIFICATIONS_TABLE_NAME = 'Verifications'
VERIFICATION_PARAMS_TABLE_NAME = 'Verification-Params'

api = Api(api_key)


airtable_url = 'https://api.airtable.com/v0/meta/bases'
study_url = f"https://api.airtable.com/v0/{base_id}/{STUDIES_TABLE_NAME}"
verification_url = f"https://api.airtable.com/v0/{base_id}/{VERIFICATIONS_TABLE_NAME}"
verification_params_url = f"https://api.airtable.com/v0/{base_id}/{VERIFICATION_PARAMS_TABLE_NAME}"
# Headers with Authorization
headers = {
    'Authorization': f'Bearer {api_key}',
    "Content-Type": "application/json"
}

airtable_studies = api.table(base_id=base_id, table_name=STUDIES_TABLE_NAME)
airtable_verifications = api.table(base_id=base_id, table_name=VERIFICATIONS_TABLE_NAME)
airtable_params = api.table(base_id=base_id, table_name=VERIFICATION_PARAMS_TABLE_NAME)


def get_table_data_by_id(base_id, table_name, id):
    table = api.table(base_id, table_name)
    formula = match({"ID": id })
    result = table.first(formula=formula)
    # combined_data = []

    # for main_record in main_table_data:
    #     combined_record = main_record['fields'].copy()

    #     if 'LinkedField' in main_record['fields']:
    #         linked_record_id = main_record['fields']['LinkedField'][0]
    #         linked_record = next((record for record in linked_table_data if record['id'] == linked_record_id), None)

    #         if linked_record:
    #             combined_record['linked_data'] = linked_record['fields']

    #     combined_data.append(combined_record)
    return result

# Route to add study to Airtable
@app.route('/api/create/studies', methods=['POST'])
def add_study():
    try:
        data = request.get_json()
        table = api.table(base_id, STUDIES_TABLE_NAME)
        table.batch_create(data["records"])
        return jsonify({"message": "Study added successfully"}), 201
    except requests.exceptions.HTTPError as err:
        return jsonify({"error": str(err)}), 422
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Route to retrieve studies from Airtable
@app.route('/api/get/studies', methods=['GET'])
def get_studies():
    try:
        table = api.table(base_id, STUDIES_TABLE_NAME)
        records = table.all()
        print(records)
        return jsonify({"response": records}), 200
    except Exception as e:
        return jsonify({"error": f"{e}"}), 400
    

@app.route('/api/get/study/<study_id>', methods=['GET'])
def get_studies_by_id(study_id):
    try:
        response = get_table_data_by_id(
            base_id=base_id,
            table_name=STUDIES_TABLE_NAME,
            id=study_id
        )
    except Exception as e:
        jsonify({"error": f"{e}"}), 400

    return jsonify({"response": response}), 200


@app.route('/api/update/studies/<study_id>', methods=['PUT'])
def update_studies(study_id):
    try:
        data = request.get_json()
        table = api.table(base_id, STUDIES_TABLE_NAME)
        response = table.update(study_id, data)
        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": f"{e}"}), 400



@app.route('/api/delete/studies/<study_id>', methods=['DELETE'])
def delete_studies(study_id):
    try:
        data = request.get_json()
        table = api.table(base_id, STUDIES_TABLE_NAME)
        response = table.delete(study_id)
        return jsonify({"response": response}), 200
    except Exception as e:
        return jsonify({"error": f"{e}"}), 400

    

# Verification

@app.route('/api/create/verification', methods=['POST'])
def add_verification():
    try:
        data = request.get_json()
        table = api.table(base_id, VERIFICATIONS_TABLE_NAME)
        table.batch_create(data["records"])
        return jsonify({"message": "Verification added successfully"}), 201
    except requests.exceptions.HTTPError as err:
        return jsonify({"error": str(err)}), 422
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/get/verification', methods=['GET'])
def get_verification():
    try:
        table = api.table(base_id, VERIFICATIONS_TABLE_NAME)
        records = table.all()
    except Exception as e:
        return jsonify({"error": f"{e}"}), 400

    return jsonify({"response": records}), 200

@app.route('/api/update/verification/<verification_id>', methods=['PUT'])
def update_verification(verification_id):
    try:
        data = request.get_json()
        table = api.table(base_id, VERIFICATIONS_TABLE_NAME)
        response = table.update(verification_id, data)
    except Exception as e:
        return jsonify({"error": f"{e}"}), 400

    return jsonify({"response": response}), 200


@app.route('/api/delete/verification/<verification_id>', methods=['DELETE'])
def delete_verification(verification_id):
    try:
        data = request.get_json()
        table = api.table(base_id, VERIFICATIONS_TABLE_NAME)
        response = table.delete(verification_id)
    except Exception as e:
        return jsonify({"error": f"{e}"}), 400

    return jsonify({"response": response}), 200


@app.route('/api/create/verification-params', methods=['POST'])
def add_verification_params():
    try:
        data = request.get_json()
        table = api.table(base_id, VERIFICATION_PARAMS_TABLE_NAME)
        table.batch_create(data["records"])
        return jsonify({"message": "Params added successfully"}), 201
    except requests.exceptions.HTTPError as err:
        return jsonify({"error": str(err)}), 422
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Route to retrieve studies from Airtable
@app.route('/api/get/verification-params', methods=['GET'])
def get_verification_params():
    try:
        table = api.table(base_id, VERIFICATION_PARAMS_TABLE_NAME)
        records = table.all()
    except Exception as e:
        return jsonify({"error": f"{e}"}), 400

    return jsonify({"response": records}), 200

@app.route('/api/update/verification-params/<param_id>', methods=['PUT'])
def update_verification_params(param_id):
    try:
        data = request.get_json()
        table = api.table(base_id, VERIFICATION_PARAMS_TABLE_NAME)
        response = table.update(param_id, data)
    except Exception as e:
        return jsonify({"error": f"{e}"}), 400

    return jsonify({"response": response}), 200


@app.route('/api/delete/verification-params/<param_id>', methods=['DELETE'])
def delete_verification_params(param_id):
    try:
        data = request.get_json()
        table = api.table(base_id, VERIFICATION_PARAMS_TABLE_NAME)
        response = table.delete(param_id)
    except Exception as e:
        return jsonify({"error": f"{e}"}), 400

    return jsonify({"response": response}), 200


if __name__ == '__main__':
    app.run(debug=True)
