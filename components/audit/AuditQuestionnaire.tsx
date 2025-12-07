import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, CheckIcon } from '@/components/icons/Icons';
import { useToast } from '@/hooks/use-toast';
import QuestionCard from './QuestionCard';
import {
  questionnaireSections,
  branchingSections,
  getApplicableBranches,
  Question,
} from './QuestionnaireData';
import {useRouter} from "next/navigation";

interface AuditQuestionnaireProps {
  onComplete: (submissionId: string) => void;
}

const AuditQuestionnaire = ({ onComplete }: AuditQuestionnaireProps) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEmailStep, setIsEmailStep] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [consentReport, setConsentReport] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBranching, setShowBranching] = useState(false);
  const [currentBranchIndex, setCurrentBranchIndex] = useState(0);
  const [currentBranchQuestionIndex, setCurrentBranchQuestionIndex] = useState(0);
  
  const router = useRouter();
  const { toast } = useToast();

  // Get current section and question
  const getAllSections = () => {
    if (showBranching) {
      return getApplicableBranches(answers);
    }
    return questionnaireSections;
  };

  const currentSection = showBranching
    ? getApplicableBranches(answers)[currentBranchIndex]
    : questionnaireSections[currentSectionIndex];
  
  const currentQuestion = showBranching
    ? getApplicableBranches(answers)[currentBranchIndex]?.questions[currentBranchQuestionIndex]
    : questionnaireSections[currentSectionIndex]?.questions[currentQuestionIndex];

  // Calculate progress
  const calculateProgress = () => {
    const mainQuestions = questionnaireSections.reduce((acc, s) => acc + s.questions.length, 0);
    const branchQuestions = getApplicableBranches(answers).reduce((acc, s) => acc + s.questions.length, 0);
    const totalQuestions = mainQuestions + branchQuestions;
    
    let answeredCount = 0;
    questionnaireSections.forEach(section => {
      section.questions.forEach(q => {
        if (answers[q.id] !== undefined && answers[q.id] !== '' && 
            (Array.isArray(answers[q.id]) ? answers[q.id].length > 0 : true)) {
          answeredCount++;
        }
      });
    });
    
    getApplicableBranches(answers).forEach(section => {
      section.questions.forEach(q => {
        if (answers[q.id] !== undefined && answers[q.id] !== '' &&
            (Array.isArray(answers[q.id]) ? answers[q.id].length > 0 : true)) {
          answeredCount++;
        }
      });
    });
    
    if (isEmailStep) return 100;
    return Math.round((answeredCount / totalQuestions) * 95);
  };

  const handleAnswer = (value: any) => {
    if (!currentQuestion) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    setErrors(prev => ({ ...prev, [currentQuestion.id]: '' }));
  };

  const validateCurrentQuestion = (): boolean => {
    if (!currentQuestion) return true;
    if (currentQuestion.required) {
      const value = answers[currentQuestion.id];
      if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        setErrors(prev => ({ ...prev, [currentQuestion.id]: 'Tato otázka je povinná' }));
        return false;
      }
    }
    return true;
  };

  const goToNext = () => {
    if (!validateCurrentQuestion()) return;

    if (showBranching) {
      const branches = getApplicableBranches(answers);
      const currentBranch = branches[currentBranchIndex];
      
      if (currentBranchQuestionIndex < currentBranch.questions.length - 1) {
        setCurrentBranchQuestionIndex(prev => prev + 1);
      } else if (currentBranchIndex < branches.length - 1) {
        setCurrentBranchIndex(prev => prev + 1);
        setCurrentBranchQuestionIndex(0);
      } else {
        setIsEmailStep(true);
      }
    } else {
      const currentSect = questionnaireSections[currentSectionIndex];
      
      if (currentQuestionIndex < currentSect.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else if (currentSectionIndex < questionnaireSections.length - 1) {
        setCurrentSectionIndex(prev => prev + 1);
        setCurrentQuestionIndex(0);
      } else {
        // Check if there are branching questions
        const branches = getApplicableBranches(answers);
        if (branches.length > 0) {
          setShowBranching(true);
          setCurrentBranchIndex(0);
          setCurrentBranchQuestionIndex(0);
        } else {
          setIsEmailStep(true);
        }
      }
    }
  };

  const goToPrevious = () => {
    if (isEmailStep) {
      const branches = getApplicableBranches(answers);
      if (branches.length > 0) {
        setIsEmailStep(false);
        setShowBranching(true);
        setCurrentBranchIndex(branches.length - 1);
        setCurrentBranchQuestionIndex(branches[branches.length - 1].questions.length - 1);
      } else {
        setIsEmailStep(false);
        setCurrentSectionIndex(questionnaireSections.length - 1);
        setCurrentQuestionIndex(questionnaireSections[questionnaireSections.length - 1].questions.length - 1);
      }
      return;
    }

    if (showBranching) {
      if (currentBranchQuestionIndex > 0) {
        setCurrentBranchQuestionIndex(prev => prev - 1);
      } else if (currentBranchIndex > 0) {
        const branches = getApplicableBranches(answers);
        setCurrentBranchIndex(prev => prev - 1);
        setCurrentBranchQuestionIndex(branches[currentBranchIndex - 1].questions.length - 1);
      } else {
        setShowBranching(false);
        setCurrentSectionIndex(questionnaireSections.length - 1);
        setCurrentQuestionIndex(questionnaireSections[questionnaireSections.length - 1].questions.length - 1);
      }
    } else {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
      } else if (currentSectionIndex > 0) {
        setCurrentSectionIndex(prev => prev - 1);
        setCurrentQuestionIndex(questionnaireSections[currentSectionIndex - 1].questions.length - 1);
      }
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasError = false;
    
    if (!name.trim()) {
      setNameError('Jméno je povinné');
      hasError = true;
    }
    
    if (!email) {
      setEmailError('Email je povinný');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Zadej platnou emailovou adresu');
      hasError = true;
    }

    if (!consentReport) {
      setEmailError('Pro odeslání reportu potřebujeme tvůj souhlas');
      hasError = true;
    }
    
    if (hasError) return;

    setIsSubmitting(true);

    try {
      // Prepare data for submission
      const submissionData = {
        name: name.trim(),
        email,
        marketing_consent: consentMarketing,
        system_type: answers.system_type || '',
        device_model: answers.device_model || null,
        other_devices: answers.other_devices || [],
        primary_accounts: answers.primary_accounts || [],
        top_usage: answers.top_usage || [],
        peak_usage_time: answers.peak_usage_time || null,
        main_goal: answers.main_goal || null,
        time_to_save: answers.time_to_save || null,
        time_wasting_apps: answers.time_wasting_apps || null,
        scrolling_triggers: answers.scrolling_triggers || [],
        notification_impact: answers.notification_impact || null,
        phone_check_frequency: answers.phone_check_frequency || null,
        phone_anxiety: answers.phone_anxiety || null,
        change_radicality: answers.change_radicality || null,
        work_regime: answers.work_regime || null,
        communication_channels: answers.communication_channels || [],
        daily_messages: answers.daily_messages || null,
        calendar_tools: answers.calendar_tools || [],
        notes_location: answers.notes_location || null,
        homescreen_state: answers.homescreen_state || null,
        app_count: answers.app_count || null,
        security_features: answers.security_features || [],
        password_manager: answers.password_manager || null,
        two_factor_auth: answers.two_factor_auth || [],
        backup_status: answers.backup_status || null,
        privacy_preference: answers.privacy_preference || null,
        always_available: answers.always_available || null,
        biggest_stress: answers.biggest_stress || null,
        desired_change: answers.desired_change || null,
        regime_changes_consent: answers.regime_changes_consent || null,
        // Branching fields
        ios_focus_modes: answers.ios_focus_modes || null,
        ios_icloud_sync: answers.ios_icloud_sync || [],
        android_digital_wellbeing: answers.android_digital_wellbeing || null,
        android_backup_method: answers.android_backup_method || null,
        work_personal_separation: answers.work_personal_separation || null,
        response_time_requirement: answers.response_time_requirement || null,
        response_blockers: answers.response_blockers || [],
        addictive_content_types: answers.addictive_content_types || [],
        barrier_preference: answers.barrier_preference || null,
        spiral_breakers: answers.spiral_breakers || [],
        critical_accounts: answers.critical_accounts || null,
        account_breach_suspicion: answers.account_breach_suspicion || null,
      };

      // Insert to database
      //const { data, error } = await supabase
      //  .from('audit_submissions')
      //  .insert(submissionData)
      //  .select('id')
      //  .single();

      // if (error) throw error;

      // Track event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'audit_complete',
          consent_marketing: consentMarketing,
        });
      }

      // Save to localStorage for thank you page
      localStorage.setItem('audit_done', 'true');
      // localStorage.setItem('audit_submission_id', data.id);
      localStorage.setItem('audit_email', email);
      localStorage.setItem('audit_name', name.trim());

      toast({
        title: 'Odesláno!',
        description: 'Tvůj audit byl úspěšně odeslán. Generujeme report...',
      });

      // onComplete(data.id);
    } catch (error) {
      console.error('Error submitting audit:', error);
      toast({
        title: 'Chyba',
        description: 'Nepodařilo se odeslat audit. Zkus to prosím znovu.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = calculateProgress();

  if (isEmailStep) {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-success/20 flex items-center justify-center mx-auto mb-6">
            <CheckIcon className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Skvělé! Audit je hotový
          </h2>
          <p className="text-muted-foreground">
            Kam ti máme poslat personalizovaný report?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Jméno
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError('');
              }}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Jak ti máme říkat?"
            />
            {nameError && (
              <p className="text-destructive text-sm mt-2">{nameError}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Abychom ti mohli napsat osobně
            </p>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="tvuj@email.cz"
            />
            {emailError && (
              <p className="text-destructive text-sm mt-2">{emailError}</p>
            )}
          </div>

          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentReport}
                onChange={(e) => setConsentReport(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-border bg-background text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">
                Chci poslat výsledky reportu na email <span className="text-destructive">*</span>
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentMarketing}
                onChange={(e) => setConsentMarketing(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-border bg-background text-primary focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground">
                Chci dostávat tipy a nabídky (max 2× měsíčně)
              </span>
            </label>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={goToPrevious}
              className="flex-1"
            >
              ← Zpět
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20"
            >
              {isSubmitting ? 'Odesílám...' : 'Odeslat a získat report'}
              <ArrowRightIcon />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Odesláním souhlasíš se{' '}
            <a href="/privacy" className="text-primary hover:underline">
              zásadami ochrany soukromí
            </a>
            .
          </p>
        </form>
      </div>
    );
  }

  if (!currentQuestion || !currentSection) {
    return null;
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-muted-foreground">
            {showBranching ? 'Doplňující otázky' : currentSection.title}
          </span>
          <span className="text-sm text-muted-foreground">
            {progress}%
          </span>
        </div>
      </div>

      {/* Section info */}
      <div className="mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-2">
          {showBranching ? getApplicableBranches(answers)[currentBranchIndex]?.title : currentSection.title}
        </span>
        <p className="text-sm text-muted-foreground">
          {showBranching
            ? 'Na základě tvých odpovědí máme pár doplňujících otázek'
            : 'description' in currentSection ? currentSection.description : ''}
        </p>
      </div>

      {/* Question */}
      <div className="mb-8">
        <QuestionCard
          question={currentQuestion}
          value={answers[currentQuestion.id]}
          onChange={handleAnswer}
          error={errors[currentQuestion.id]}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={goToPrevious}
          disabled={currentSectionIndex === 0 && currentQuestionIndex === 0 && !showBranching}
          className="text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Zpět
        </button>
        <Button
          onClick={goToNext}
          className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20"
        >
          Další
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default AuditQuestionnaire;
