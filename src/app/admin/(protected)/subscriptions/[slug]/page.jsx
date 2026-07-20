'use client';

import { FormEvent, useState } from 'react';
import subscriptionData from '@/data/plan.json';
import { Icon } from '@iconify/react';

import BackButton from '@/components/ui/BackButton';
import SuccessModal from '@/components/shared/modals/SuccessModal';
import NotFound from '@/components/ui/NotFound';
import AuthInput from '@/components/ui/auth/AuthInput'; // Adjust the import path as needed
import { useNavigate, useParams } from 'react-router';

export default function EditSubscriptionPage() {
  const navigate = useNavigate();
  const params = useParams();
  const slug = params.slug;

  const currentSubscription = subscriptionData.subscriptions.find(
    (subscription) => subscription.href.split('/').pop() === slug
  );

  const [title, setTitle] = useState(currentSubscription?.title ?? '');
  const [duration, setDuration] = useState(
    currentSubscription?.billingPeriod ?? ''
  );
  const [price, setPrice] = useState(currentSubscription?.price ?? '');
  const [description, setDescription] = useState(
    currentSubscription?.description ?? ''
  );
  const [points, setPoints] = useState(
    currentSubscription?.features ?? []
  );

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePointChange = (index, value) => {
    setPoints((currentPoints) =>
      currentPoints.map((point, pointIndex) =>
        pointIndex === index ? value : point
      )
    );
  };

  const handleAddPoint = () => {
    setPoints((currentPoints) => [...currentPoints, '']);
  };

  const handleRemovePoint = (index) => {
    setPoints((currentPoints) =>
      currentPoints.filter((_, pointIndex) => pointIndex !== index)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      const formData = {
        title,
        duration,
        price,
        description,
        points: points.filter((point) => point.trim()),
      };

      console.log('Updated subscription:', formData);

      // Add your API call here.
      // await updateSubscription(formData);

      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Failed to update subscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalDone = () => {
    setIsSuccessModalOpen(false);
    navigate('/subscriptions');
  };

  if (!currentSubscription) {
    return <NotFound />;
  }

  return (
    <>
      <div className="w-full">
        <BackButton href="/subscriptions">
          Edit Subscription
        </BackButton>

        <form
          onSubmit={handleSubmit}
          className="mt-3 flex w-full flex-wrap gap-6 edit-subscription-form"
        >
          <div className='w-full max-w-[20rem] xl:max-w-[40rem]'>
            <h3 className="mb-3 font-medium text-white w-full ">
                .
            </h3>
            <div className=' flex flex-col w-full  gap-6'> 
              
              
              {/* Title Input */}
              <AuthInput
                label="Title"
                placeholder="Pilot Car"
                type="text"
                value={title}
                onChange={(e) => setTitle((e.target).value)}
                required
              />

              {/* Duration Input */}
              <AuthInput
                label="Duration"
                placeholder="Monthly"
                type="text"
                value={duration}
                onChange={(e) => setDuration((e.target).value)}
                required
              />

              {/* Price Input */}
              <AuthInput
                label="Price"
                placeholder="0"
                type="number"
                value={price}
                min="0"
                step="1"
                inputMode="numeric"
                required
                onKeyDown={(event) => {
                  if (['e', 'E', '+', '-', '.'].includes(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(event) => {
                  const value = (event.target).value;
                  if (value === '' || /^\d+$/.test(value)) {
                    setPrice(value);
                  }
                }}
                onPaste={(event) => {
                  const pastedValue = event.clipboardData.getData('text');
                  if (!/^\d+$/.test(pastedValue)) {
                    event.preventDefault();
                  }
                }}
              />

              {/* Description Input */}
              <AuthInput
                label="Description"
                placeholder="Enter subscription details..."
                type="text"
                as="textarea" /* Pass down custom handling if your input supports tag casting, otherwise standard styling applies */
                value={description}
                onChange={(e) => setDescription((e.target).value)}
                required
              />
            </div>
          </div>

        {/* Point List Fields */}
          <div className="w-full max-w-[20rem] xl:max-w-[40rem]">
            <h3 className="mb-3 font-medium text-black">
              Point List
            </h3>

            <div className="flex flex-col gap-3">
              {points.map((point, index) => (
                <div
                  key={index}
                  className="flex w-full items-center gap-3"
                >
                  <div className="flex-1">
                    <AuthInput
                      placeholder="Enter point"
                      type="text"
                      value={point}
                      onChange={(e) => handlePointChange(index, (e.target).value)}
                      required
                      icon="icon-park-outline:dot"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemovePoint(index)}
                    disabled={points.length === 1}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={`Remove point ${index + 1}`}
                  >
                    <Icon
                      icon="lucide:x"
                      className="h-4 w-4"
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={handleAddPoint}
                className="flex items-center gap-3 font-medium text-black"
              >
                <span>Add More</span>

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white transition hover:scale-105">
                  <Icon
                    icon="lucide:plus"
                    className="h-4 w-4"
                  />
                </span>
              </button>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex button h-[2.75rem] mt-6 w-full max-w-[20rem] xl:max-w-[40rem] items-center justify-center rounded-lg bg-brand-gradient font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
            >
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </div>

          {/* Form Submit Action */}
          
        </form>
      </div>

      <SuccessModal
        open={isSuccessModalOpen}
        onDone={handleModalDone}
        title="Successfully!"
        description="Subscription has been updated successfully."
        buttonText="Done"
      />
    </>
  );
}