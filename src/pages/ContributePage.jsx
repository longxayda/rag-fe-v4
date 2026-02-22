import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Landmark,
  PenLine,
  Plus,
  Camera,
  ChevronRight,
  CheckCircle,
  Upload,
  X,
  MapPin,
  Calendar,
  FileText,
  User,
  Mail,
  Phone,
  Send,
  ArrowLeft,
  Sparkles,
  Info
} from 'lucide-react';
import { useContribution, CONTRIBUTION_TYPES } from '../context/ContributionContext';
import { COMMUNES } from '../data/communes';

// Contribution type options (labels via i18n)
const contributionTypeOptions = [
  {
    id: CONTRIBUTION_TYPES.NEW_HERITAGE,
    icon: Plus,
    titleKey: 'contribute.newHeritage',
    descKey: 'contribute.newHeritageDesc',
    color: 'bg-heritage-red-100 dark:bg-heritage-red-900/30 text-heritage-red-700 dark:text-heritage-red-300',
    borderColor: 'border-heritage-red-300 dark:border-heritage-red-700',
    iconBg: 'bg-heritage-red-600',
  },
  {
    id: CONTRIBUTION_TYPES.CORRECTION,
    icon: PenLine,
    titleKey: 'contribute.correction',
    descKey: 'contribute.correctionDesc',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    borderColor: 'border-blue-300 dark:border-blue-700',
    iconBg: 'bg-blue-600',
  },
  {
    id: CONTRIBUTION_TYPES.ADDITIONAL_INFO,
    icon: FileText,
    titleKey: 'contribute.additionalInfo',
    descKey: 'contribute.additionalInfoDesc',
    color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
    borderColor: 'border-emerald-300 dark:border-emerald-700',
    iconBg: 'bg-emerald-600',
  },
  {
    id: CONTRIBUTION_TYPES.PHOTO,
    icon: Camera,
    titleKey: 'contribute.photo',
    descKey: 'contribute.photoDesc',
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    borderColor: 'border-purple-300 dark:border-purple-700',
    iconBg: 'bg-purple-600',
  },
];

export default function ContributePage() {
  const { t } = useTranslation();
  const { submitContribution } = useContribution();

  const [step, setStep] = useState(1); // 1: select type, 2: fill form, 3: success
  const [selectedType, setSelectedType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedContribution, setSubmittedContribution] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    // Contributor info
    contributorName: '',
    contributorEmail: '',
    contributorPhone: '',

    // Heritage info (for new heritage)
    heritageName: '',
    heritageAddress: '',
    heritageCommune: '',
    heritageDescription: '',
    heritageHistory: '',
    heritageYearBuilt: '',
    heritageCondition: '',
    heritageSource: '',

    // Correction info
    existingHeritageName: '',
    fieldToCorrect: '',
    currentValue: '',
    suggestedValue: '',
    correctionReason: '',

    // Additional info
    additionalInfoType: '',
    additionalContent: '',

    // Photos
    photos: [],
    photoDescriptions: '',
    copyrightConfirmed: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.photos.length > 5) {
      setErrors((prev) => ({ ...prev, photos: t('contribute.maxPhotos') }));
      return;
    }

    // Convert to base64 for demo (in production, would upload to server)
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photos: [...prev.photos, { name: file.name, data: reader.result }],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate based on contribution type
    if (selectedType === CONTRIBUTION_TYPES.NEW_HERITAGE) {
      if (!formData.heritageName.trim()) {
        newErrors.heritageName = t('contribute.pleaseHeritageName');
      }
      if (!formData.heritageAddress.trim()) {
        newErrors.heritageAddress = t('contribute.pleaseAddress');
      }
      if (!formData.heritageDescription.trim()) {
        newErrors.heritageDescription = t('contribute.pleaseDescription');
      }
    }

    if (selectedType === CONTRIBUTION_TYPES.CORRECTION) {
      if (!formData.existingHeritageName.trim()) {
        newErrors.existingHeritageName = t('contribute.pleaseHeritageName');
      }
      if (!formData.fieldToCorrect.trim()) {
        newErrors.fieldToCorrect = t('contribute.pleaseSelectField');
      }
      if (!formData.suggestedValue.trim()) {
        newErrors.suggestedValue = t('contribute.pleaseSuggestedValue');
      }
    }

    if (selectedType === CONTRIBUTION_TYPES.ADDITIONAL_INFO) {
      if (!formData.existingHeritageName.trim()) {
        newErrors.existingHeritageName = t('contribute.pleaseHeritageName');
      }
      if (!formData.additionalContent.trim()) {
        newErrors.additionalContent = t('contribute.pleaseDescription');
      }
    }

    if (selectedType === CONTRIBUTION_TYPES.PHOTO) {
      if (formData.photos.length === 0) {
        newErrors.photos = t('contribute.pleaseUploadOne');
      }
      if (!formData.copyrightConfirmed) {
        newErrors.copyrightConfirmed = t('contribute.pleaseConfirmCopyright');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const contributor = {
      name: formData.contributorName,
      email: formData.contributorEmail,
      phone: formData.contributorPhone,
    };

    let data = {};

    switch (selectedType) {
      case CONTRIBUTION_TYPES.NEW_HERITAGE:
        data = {
          name: formData.heritageName,
          address: formData.heritageAddress,
          commune: formData.heritageCommune,
          description: formData.heritageDescription,
          history: formData.heritageHistory,
          yearBuilt: formData.heritageYearBuilt,
          condition: formData.heritageCondition,
          source: formData.heritageSource,
          photos: formData.photos,
        };
        break;

      case CONTRIBUTION_TYPES.CORRECTION:
        data = {
          heritageName: formData.existingHeritageName,
          field: formData.fieldToCorrect,
          currentValue: formData.currentValue,
          suggestedValue: formData.suggestedValue,
          reason: formData.correctionReason,
        };
        break;

      case CONTRIBUTION_TYPES.ADDITIONAL_INFO:
        data = {
          heritageName: formData.existingHeritageName,
          infoType: formData.additionalInfoType,
          content: formData.additionalContent,
          source: formData.heritageSource,
        };
        break;

      case CONTRIBUTION_TYPES.PHOTO:
        data = {
          heritageName: formData.existingHeritageName,
          photos: formData.photos,
          descriptions: formData.photoDescriptions,
        };
        break;
    }

    const contribution = submitContribution(selectedType, data, contributor);
    setSubmittedContribution(contribution);
    setIsSubmitting(false);
    setStep(3);
  };

  const resetForm = () => {
    setStep(1);
    setSelectedType(null);
    setSubmittedContribution(null);
    setFormData({
      contributorName: '',
      contributorEmail: '',
      contributorPhone: '',
      heritageName: '',
      heritageAddress: '',
      heritageCommune: '',
      heritageDescription: '',
      heritageHistory: '',
      heritageYearBuilt: '',
      heritageCondition: '',
      heritageSource: '',
      existingHeritageName: '',
      fieldToCorrect: '',
      currentValue: '',
      suggestedValue: '',
      correctionReason: '',
      additionalInfoType: '',
      additionalContent: '',
      photos: [],
      photoDescriptions: '',
      copyrightConfirmed: false,
    });
    setErrors({});
  };

  // Render Step 1: Type Selection
  const renderTypeSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-heritage-gold-100 dark:bg-heritage-gold-900/30 mb-4">
          <Sparkles className="w-8 h-8 text-heritage-gold-600 dark:text-heritage-gold-400" />
        </div>
        <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100">
          {t('contribute.selectType')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {t('contribute.selectTypeDesc')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contributionTypeOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              setSelectedType(option.id);
              setStep(2);
            }}
            className={`group p-6 rounded-2xl border-2 ${option.borderColor} ${option.color} text-left transition-all hover:scale-[1.02] hover:shadow-lg`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${option.iconBg} flex items-center justify-center flex-shrink-0`}>
                <option.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg mb-1">
                  {t(option.titleKey)}
                </h3>
                <p className="text-sm opacity-80">
                  {t(option.descKey)}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // Render form input with error
  const renderInput = (field, label, placeholder, type = 'text', required = false) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && <span className="text-heritage-red-500">*</span>}
      </label>
      <input
        type={type}
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors[field]
            ? 'border-red-400 dark:border-red-600'
            : 'border-gray-300 dark:border-gray-600'
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-heritage-gold-500 focus:ring-2 focus:ring-heritage-gold-100 dark:focus:ring-heritage-gold-900/50 transition-all`}
      />
      {errors[field] && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors[field]}</p>
      )}
    </div>
  );

  // Render textarea with error
  const renderTextarea = (field, label, placeholder, rows = 4, required = false) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && <span className="text-heritage-red-500">*</span>}
      </label>
      <textarea
        value={formData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors[field]
            ? 'border-red-400 dark:border-red-600'
            : 'border-gray-300 dark:border-gray-600'
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-heritage-gold-500 focus:ring-2 focus:ring-heritage-gold-100 dark:focus:ring-heritage-gold-900/50 transition-all resize-none`}
      />
      {errors[field] && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors[field]}</p>
      )}
    </div>
  );

  // Render Step 2: Form
  const renderForm = () => {
    const selectedOption = contributionTypeOptions.find((o) => o.id === selectedType);

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setStep(1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div className={`w-12 h-12 rounded-xl ${selectedOption.iconBg} flex items-center justify-center`}>
            <selectedOption.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-gray-900 dark:text-gray-100">
              {t(selectedOption.titleKey)}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('contribute.fillInfoBelow')}
            </p>
          </div>
        </div>

        {/* Contributor Info Section */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-heritage-gold-600" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {t('contribute.contributorInfo')}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({t('contribute.optional')})
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {renderInput(
              'contributorName',
              t('contribute.fullName'),
              t('contribute.fullNamePlaceholder'),
            )}
            {renderInput(
              'contributorEmail',
              'Email',
              t('contribute.emailPlaceholder'),
              'email'
            )}
            {renderInput(
              'contributorPhone',
              t('contribute.phone'),
              t('contribute.phonePlaceholder'),
              'tel'
            )}
          </div>
        </div>

        {/* Type-specific forms */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          {/* New Heritage Form */}
          {selectedType === CONTRIBUTION_TYPES.NEW_HERITAGE && (
            <>
              <div className="flex items-center gap-2 mb-4">
                <Landmark className="w-5 h-5 text-heritage-red-600" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {t('contribute.heritageInfo')}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderInput(
                  'heritageName',
                  t('contribute.heritageName'),
                  t('contribute.heritageNamePlaceholder'),
                  'text',
                  true
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contribute.commune')}
                  </label>
                  <select
                    value={formData.heritageCommune}
                    onChange={(e) => handleInputChange('heritageCommune', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-heritage-gold-500 focus:ring-2 focus:ring-heritage-gold-100 dark:focus:ring-heritage-gold-900/50 transition-all"
                  >
                    <option value="">-- {t('contribute.selectCommune')} --</option>
                    {COMMUNES.map((commune) => (
                      <option key={commune} value={commune}>{commune}</option>
                    ))}
                  </select>
                </div>
              </div>

              {renderInput(
                'heritageAddress',
                t('contribute.heritageAddress'),
                t('contribute.addressPlaceholder'),
                'text',
                true
              )}

              {renderTextarea(
                'heritageDescription',
                t('contribute.heritageDescription'),
                t('contribute.heritageDescriptionPlaceholder'),
                4,
                true
              )}

              {renderTextarea(
                'heritageHistory',
                t('contribute.heritageHistory'),
                t('contribute.heritageHistoryPlaceholder'),
                4
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderInput(
                  'heritageYearBuilt',
                  t('contribute.yearBuilt'),
                  t('contribute.yearBuiltPlaceholder')
                )}
                {renderInput(
                  'heritageCondition',
                  t('contribute.currentCondition'),
                  t('contribute.currentConditionPlaceholder')
                )}
              </div>

              {renderInput(
                'heritageSource',
                t('contribute.source'),
                t('contribute.sourcePlaceholderDesc')
              )}
            </>
          )}

          {/* Correction Form */}
          {selectedType === CONTRIBUTION_TYPES.CORRECTION && (
            <>
              <div className="flex items-center gap-2 mb-4">
                <PenLine className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {t('contribute.correctionInfo')}
                </h3>
              </div>

              {renderInput(
                'existingHeritageName',
                t('contribute.heritageToCorrect'),
                t('contribute.heritageNameToCorrectPlaceholder'),
                'text',
                true
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contribute.fieldToCorrect')} <span className="text-heritage-red-500">*</span>
                </label>
                <select
                  value={formData.fieldToCorrect}
                  onChange={(e) => handleInputChange('fieldToCorrect', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.fieldToCorrect ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-heritage-gold-500 focus:ring-2 focus:ring-heritage-gold-100 dark:focus:ring-heritage-gold-900/50 transition-all`}
                >
                  <option value="">-- {t('contribute.selectField')} --</option>
                  <option value="name">{t('contribute.name')}</option>
                  <option value="address">{t('contribute.address')}</option>
                  <option value="yearBuilt">{t('contribute.yearBuiltLabel')}</option>
                  <option value="yearRanked">{t('contribute.yearRanked')}</option>
                  <option value="rankingType">{t('contribute.rankingType')}</option>
                  <option value="description">{t('contribute.description')}</option>
                  <option value="other">{t('contribute.other')}</option>
                </select>
                {errors.fieldToCorrect && (
                  <p className="mt-1 text-sm text-red-500">{errors.fieldToCorrect}</p>
                )}
              </div>

              {renderInput(
                'currentValue',
                t('contribute.currentValue'),
                t('contribute.currentValuePlaceholder')
              )}

              {renderTextarea(
                'suggestedValue',
                t('contribute.suggestedValue'),
                t('contribute.suggestedValuePlaceholder'),
                3,
                true
              )}

              {renderTextarea(
                'correctionReason',
                t('contribute.reason'),
                t('contribute.reasonPlaceholder'),
                3
              )}
            </>
          )}

          {/* Additional Info Form */}
          {selectedType === CONTRIBUTION_TYPES.ADDITIONAL_INFO && (
            <>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {t('contribute.additionalInfoSection')}
                </h3>
              </div>

              {renderInput(
                'existingHeritageName',
                t('contribute.heritageName'),
                t('contribute.enterHeritageName'),
                'text',
                true
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contribute.infoType')}
                </label>
                <select
                  value={formData.additionalInfoType}
                  onChange={(e) => handleInputChange('additionalInfoType', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-heritage-gold-500 focus:ring-2 focus:ring-heritage-gold-100 dark:focus:ring-heritage-gold-900/50 transition-all"
                >
                  <option value="">-- {t('contribute.selectTypeOption')} --</option>
                  <option value="history">{t('contribute.history')}</option>
                  <option value="architecture">{t('contribute.architecture')}</option>
                  <option value="culture">{t('contribute.culture')}</option>
                  <option value="events">{t('contribute.events')}</option>
                  <option value="stories">{t('contribute.stories')}</option>
                  <option value="other">{t('contribute.other')}</option>
                </select>
              </div>

              {renderTextarea(
                'additionalContent',
                t('contribute.additionalContent'),
                t('contribute.additionalContentPlaceholder'),
                5,
                true
              )}

              {renderInput(
                'heritageSource',
                t('contribute.sourceLabel'),
                t('contribute.sourcePlaceholder')
              )}
            </>
          )}

          {/* Photo Form */}
          {selectedType === CONTRIBUTION_TYPES.PHOTO && (
            <>
              <div className="flex items-center gap-2 mb-4">
                <Camera className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {t('contribute.photoSection')}
                </h3>
              </div>

              {renderInput(
                'existingHeritageName',
                t('contribute.heritageNameOptional'),
                t('contribute.heritagePhotoBelongsTo')
              )}

              {/* Photo upload area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contribute.uploadPhotos')} <span className="text-heritage-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">({t('contribute.maxPhotos')})</span>
                </label>

                <div className={`border-2 border-dashed ${errors.photos ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-xl p-6 text-center`}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer flex flex-col items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Upload className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <span className="text-purple-600 dark:text-purple-400 font-medium">
                        {t('contribute.clickToUpload')}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400"> {t('contribute.orDragDrop')}</span>
                    </div>
                    <p className="text-xs text-gray-400">PNG, JPG, WEBP (max 10MB each)</p>
                  </label>
                </div>

                {errors.photos && (
                  <p className="mt-1 text-sm text-red-500">{errors.photos}</p>
                )}

                {/* Photo previews */}
                {formData.photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo.data}
                          alt={photo.name}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {renderTextarea(
                'photoDescriptions',
                t('contribute.photoDescriptions'),
                t('contribute.photoDescriptionsPlaceholder'),
                3
              )}

              {/* Copyright confirmation */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.copyrightConfirmed}
                    onChange={(e) => handleInputChange('copyrightConfirmed', e.target.checked)}
                    className="mt-1 w-4 h-4 text-heritage-red-600 border-gray-300 rounded focus:ring-heritage-gold-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {t('contribute.copyrightConfirm')}
                  </span>
                </label>
                {errors.copyrightConfirmed && (
                  <p className="mt-1 text-sm text-red-500 ml-7">{errors.copyrightConfirmed}</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            onClick={() => setStep(1)}
            className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {t('contribute.back')}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-heritage-red-700 to-heritage-red-800 text-white rounded-xl font-medium hover:from-heritage-red-800 hover:to-heritage-red-900 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t('contribute.submitting')}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {t('contribute.submit')}
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  // Render Step 3: Success
  const renderSuccess = () => (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-6">
        <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
      </div>

      <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4">
        {t('contribute.thankYou')}
      </h2>

      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
        {t('contribute.successMessage')}
      </p>

      {submittedContribution && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 max-w-sm mx-auto mb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('contribute.contributionId')}
          </p>
          <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
            {submittedContribution.id}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={resetForm}
          className="px-6 py-3 bg-heritage-red-700 text-white rounded-xl font-medium hover:bg-heritage-red-800 transition-colors"
        >
          {t('contribute.contributeMore')}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="relative bg-gradient-to-r from-heritage-red-800 via-heritage-red-700 to-heritage-red-800 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl p-6 sm:p-8 mb-8 text-white overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-heritage-gold-400 via-heritage-gold-300 to-heritage-gold-400" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-heritage-gold-400 via-heritage-gold-300 to-heritage-gold-400" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-heritage-gold-500 flex items-center justify-center shadow-md">
              <Landmark className="w-7 h-7 text-heritage-red-800 dark:text-gray-900" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold">
                {t('contribute.contributeHeritage')}
              </h1>
              <p className="text-heritage-gold-300">
                {t('contribute.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-heritage-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-heritage-red-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-heritage-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-heritage-red-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-emerald-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
              ✓
            </div>
          </div>
        </div>

        {/* Main content card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
          {step === 1 && renderTypeSelection()}
          {step === 2 && renderForm()}
          {step === 3 && renderSuccess()}
        </div>

        {/* Info note */}
        <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700 dark:text-blue-300">
            {t('contribute.infoNote')}
          </p>
        </div>
      </div>
    </div>
  );
}
